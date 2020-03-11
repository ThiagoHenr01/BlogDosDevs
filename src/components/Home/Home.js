import React, { Component } from 'react';
import firebase from '../../firebase';

import './Home.css';

class Home extends Component {

    state = {

        posts: []

    };

    componentDidMount() {

        firebase.app.ref('posts').once('value', (snapshot) => {

            let state = this.state;

            state.posts = [];

            snapshot.forEach((childeItem) => {

                state.posts.push({

                    key: childeItem.key,
                    titulo: childeItem.val().titulo,
                    autor: childeItem.val().autor,
                    image: childeItem.val().image,
                    descricao: childeItem.val().descricao

                });

            });

            state.posts.reverse();

            this.setState(state);

        });

    };

    render() {

        return(

            <section id="post" >

                { this.state.posts.map((post) => {

                    return(

                        <article key={post.key} >

                            <header>

                                <div className="title" >

                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>

                                </div>

                            </header>

                            <img src={post.image} alt="Capa do Post"/>

                            <footer>

                                <p>{post.descricao}</p>

                            </footer>

                        </article>

                    );

                }) }

            </section>

        );

    };

};

export default Home;