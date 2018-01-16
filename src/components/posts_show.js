import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	// PostsShow component has a dependency on the huge object of the posts list in app.
	// but only cares about only one single post
	// so, we can just pass in a single post
	componentDidMount() {
		// access a prop from react router
		// params will contain all wild parts inside the url
		
		// if do not want to refetch the data
		// if (!this.props.post) {
		const { id } = this.props.match.params;

		this.props.fetchPost(id);
		// }
	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		// calls an action creator: make an Ajax request to delete one particular post
		
		// id is refer to this.props.post.id, but it can be risky because the post may not be completed
		// add a callback function, whenever a user click the button to delete a post,
		// wait for the request to be completed and navigate user back to the list of posts by calling it
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		// posts[this.props.match.params.id]; // the post we want to show
		// this.props === ownProps
		// get the one this.props.post not this.props.posts[this.props.match.params.id]
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) {
	// arguements: application state, ownProps: props that is going to this component
	// take care of the posts list and a particular id
	// return { posts };
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost } )(PostsShow);
