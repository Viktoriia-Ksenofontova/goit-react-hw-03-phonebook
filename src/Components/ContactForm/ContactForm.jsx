import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.formSubmitHandler(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={this.nameInputId} className={styles.formLabel}>
          Name
          <input
            className={styles.formInput}
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            id={this.nameInputId}
          />
        </label>

        <label htmlFor={this.numberInputId} className={styles.formLabel}>
          Number
          <input
            className={styles.formInput}
            type="tel"
            placeholder="Enter telephone number"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            id={this.numberInputId}
          />
        </label>
        <button type="submit" className={styles.formBtn}>
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
