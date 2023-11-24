import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import '../../assets/css/NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <Container className="text-center not-found-container">
            <h1 className="inactive-text rotate-letters animated wobble"><span>404</span></h1>
            <p className="lead emoji" role="img" aria-label="Sad Emoji">😢</p>
            <p className="lead rotate-letters"><span>Oh non! La page que vous recherchez n'existe pas.</span></p>
            <Link to="/">
                <Button variant="primary" className="mt-3">Retour à la page d'accueil</Button>
            </Link>
        </Container>
    );
};

export default NotFoundPage;
