import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) {
		// return some JSX - arguement: 
		// contains some event handlers that are responsible for ensure the Field knows 
		// it is responsible for this input
		// field.input is an object that contains some event handlers (onChange, onFocus, onBlur...) and some props
		// ...: makes all props of field.input to be communicated to be as props to the <input> tag
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				{field.meta.error}
			</div>
		);
	}

	render() {
		return (
			<form>
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
		errors.title = "Enter a title please!";
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

export default reduxForm({
	validate,
	// validate: validate,
	form: 'PostsNewForm'
})(PostsNew);
