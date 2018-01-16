import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		// return some JSX - arguement: 
		// contains some event handlers that are responsible for ensure the Field knows 
		// it is responsible for this input
		// field.input is an object that contains some event handlers (onChange, onFocus, onBlur...) and some props
		// ...: makes all props of field.input to be communicated to be as props to the <input> tag
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		// this === component: bind
		// an object contains all information input
		// send it to back end (post API)
		
		// attempt to do the navigation AFTER the request
		// this.props.history.push('/');
		
		// calling an action creactor which is responsible for posting the data to API
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		// a property that been passed to the component on behalf of Redux Form
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					label="Title For Post"
					name="title"
					component={this.renderField}
				/>
				<Field 
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	// values is an object contains all values that user enteren into the form
	const errors = {};

	// validate the inputs from 'values'
	// if (!values.title || values.title.length < 3) {
	// 	errors.title = "Enter a title that is at least 3 characters!";
	// }
	// if (values.title.length < 3) {
	// 	errors.title = "The title must be at least 3 characters";
	// }
	if (!values.title) {
		errors.title = "Enter a title please";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Enter some content please";
	}
	
	// If errors is empty, the form is fine to submit
	// If errors has *any* properties, redux form assumes form is invalid
	return errors;
}

// add additional properties to the component PostsNew
export default reduxForm({
	validate,
	// validate: validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);
