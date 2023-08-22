/** @format */

import { Component } from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './style.css';

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		name: '',
		number: '',
		filter: '',
	};

	schema = yup.object({
		name: yup.string().min(2).required('Name is required'),
		number: yup.string().min(6).max(10).required('Number is required'),
	});

	handlerOnChange = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	handlerOnFitred = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	handleAddContact = e => {
		e.preventDefault();

		const validateObj = { name: this.state.name, number: this.state.number };

		this.schema
			.validate(validateObj)
			.then(() => {
				const checkName = this.state.contacts.find(
					contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
				);
				if (checkName) {
					alert(`${checkName.name} is already in contacts.`);
					return;
				}

				this.setState(prevState => {
					const newState = {
						contacts: [
							...prevState.contacts,
							{
								id: nanoid(),
								name: this.state.name,
								number: this.state.number,
							},
						],
						name: '',
						number: '',
					};

					return newState;
				});
			})
			.catch(validationErrors => {
				Notify.failure(`Error: ${validationErrors.errors}`);
			});
	};

	handleDelClick = e => {
		this.setState(prevState => {
			const updatedContacts = prevState.contacts.filter(
				contact => contact.id !== e.target.id
			);
			return { contacts: updatedContacts };
		});
	};

	handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	render() {
		return (
			<div className='container'>
				<h1 className='title-name'>Phonebook</h1>
				<form className='form-contact' onSubmit={this.handleAddContact}>
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
				<h2 className='title-name'>Contacts</h2>
				<label className='filter-field'>
					Find contacts by name
					<input
						className='input-field filter'
						value={this.state.filter}
						type='text'
						name='filter'
						autoComplete='off'
						onChange={this.handlerOnFitred}
					/>
				</label>
				{this.state.contacts
					.filter(contact => {
						const searchName = contact.name.toLowerCase();
						const filterName = this.state.filter.toLowerCase();
						return searchName.includes(filterName);
					})
					.map(({ id, name, number }) => (
						<div className='contact-containet' key={id}>
							<p className='contact'>
								{name} {number}
							</p>
							<button
								id={id}
								className='del-button button'
								type='submit'
								onClick={this.handleDelClick}
							>
								Delete
							</button>
						</div>
					))}
			</div>
		);
	}
}

export default App;
