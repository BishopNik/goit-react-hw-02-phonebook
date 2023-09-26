/** @format */

import PropTypes from 'prop-types';
import './style.css';

const ContactList = ({ contacts, onDeleteContact }) => {
	return (
		<>
			{contacts.map(({ id, name, number }) => (
				<div className='contact-containet' key={id}>
					<p className='contact'>
						{name} {number}
					</p>
					<button
						id={id}
						className='del-button button'
						type='submit'
						onClick={onDeleteContact}
					>
						Delete
					</button>
				</div>
			))}
		</>
	);
};

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})
	).isRequired,
	onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
