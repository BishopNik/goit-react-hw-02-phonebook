/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ContactForm extends Component {
	state = {
		name: '',
		number: '',
	};

	static propTypes = {
		onSubmitForm: PropTypes.func.isRequired,
	};

	handlerOnChange = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmitForm(this.state).then(res => this.setState(res));
	};

	render() {
		return (
			<form className='form-contact' onSubmit={this.handleSubmit}>
				<label className='label'>
					Name
					<input
						className='input-field'
						value={this.state.name}
						type='text'
						name='name'
						pattern="^[a-zA-Zа-яА-Я]+([' \-]?[a-zA-Zа-яА-Я ])*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
						autoComplete='off'
						onChange={this.handlerOnChange}
					/>
				</label>
				<label className='label'>
					Number
					<input
						className='input-field'
						value={this.state.number}
						type='tel'
						name='number'
						pattern='\+?\d{1,4}[\-.\s]?\(?\d{1,3}\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
						title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
						required
						autoComplete='off'
						onChange={this.handlerOnChange}
					/>
				</label>
				<button className='add-contact button' type='submit' onClick={this.handleClick}>
					Add contact
				</button>
			</form>
		);
	}
}

export default ContactForm;
