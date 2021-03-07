import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/Contacts/ContactsList';
import Section from './Components/Section';
import Filter from './Components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const myContacts = JSON.parse(localStorage.getItem('contacts'));
    if (myContacts) {
      this.setState({ contacts: myContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    if (this.state.contacts.find(({ name }) => name === data.name)) {
      return toast.info(`${data.name} is already in contacts.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (data.name !== '' && data.number !== '') {
      const newContact = {
        id: uuidv4(),
        name: data.name,
        number: data.number,
      };

      return this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
    return toast.warn(`All fields must be filled.`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getFiltredContacts();

    return (
      <div className="App">
        <Section title="Phonebook">
          <ContactForm formSubmitHandler={this.formSubmitHandler} />
        </Section>

        <Section title="Contacts">
          {filtredContacts.length > 0 ? (
            <>
              <Filter value={filter} onChange={this.changeFilter} />
              <ContactList
                contacts={filtredContacts}
                onDeleteContact={this.deleteContact}
              />
            </>
          ) : (
            <h3>You have not contacts yet</h3>
          )}
        </Section>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
