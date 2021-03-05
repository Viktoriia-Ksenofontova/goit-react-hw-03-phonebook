import React from 'react';
import styles from './ContactsList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.contactsList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.listItem}>
        <p className="name">
          {name}: <span>{number}</span>
        </p>
        <button
          className={styles.Btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
