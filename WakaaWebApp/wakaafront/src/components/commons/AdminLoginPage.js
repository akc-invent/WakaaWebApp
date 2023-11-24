import React, { useState, useEffect } from 'react';
import { Container, Carousel, Button, Dropdown, Form, DropdownButton, FormGroup } from 'react-bootstrap';
import '../../assets/css/AdminLoginPage.css';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [carousel, setCarousel] = useState({
        title: "",
        description: "",
    });
    const [rememberMe, setRememberMe] = useState(false);

    const history = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        // Logique pour gérer la connexion
        try{
            // Envoyer les données d'authentification au backend Django
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe,
                }),
            });

            if(response.ok) {
              const userData = await response.json();

              // Vérifier si l'utilisateur est un superadministrateur uniquement
              if (userData.role === "superadmin") {
                const user_id = userData.id;
                const user_email = userData.email;
                history(`/administration?${user_id}:${user_email}/dashboard`);
              } else {
                console.log('Vous n\'avez pas les droits suffisants pour accéder à cette interface');
                history(`/administration/login`);
              }
            } else {
                // Gérer les erreurs d'authentification ici
                console.error("Echec de la connexion");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        } finally {
          setIsLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
      };

    return(
        <div>
        <div className="container-fluid mt-5">
            <div className="row justify-content-center align-items-center" id='formCarouselRow'>
          {/* Colonne de gauche avec le formulaire */}
          <div className="col-md-6">
            <main className="form-signin">
              <form style={{textAlign: "center"}}>
                <img
                  src="../../assets/images/cars-5970663_1920.png"
                  className="mb-4"
                  alt=""
                  width="100"
                  height="80"
                />
                
                <h1 className='label-connexion'>Connectez-vous</h1>
                <h3 className='label-administration'>Administration</h3>

                <Form.Group controlId="inputEmail" className="mb-3">
                  <Form.Label className='visually-hidden'>Adresse Email :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entrez votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className='form-control'
                  />
                </Form.Group>
  
                <Form.Group controlId="inputPassword" className="mb-3">
                  <Form.Label className='visually-hidden'>Mot de passe :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    className='form-control'
                  />
                </Form.Group>

                <Form.Group controlId="rememberMe" className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Se souvenir de moi"
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                        style={{textAlign:"left"}}
                />
              </Form.Group>

              {isLoading ? (
                // Afficher le spinner pendant le chargement
                <Button variant='primary' type='submit' className='submit' disabled>
                  <span className='spinner-border spinner-border-sm' role='status' aria-hidden="true"></span>
                  {' '}Connexion...
                </Button>
              ) : (
                // Afficher le texte normal lorsque le chargement n'est pas encours
                <Button variant='primary' type='submit' className='submit' onClick={handleLogin}>
                  Sign In
                </Button>
              )}

              {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <hr />
              </form>
            </main>
          </div>
  
          {/* Colonne de droite avec le carrousel */}
          <div className="col-md-6" id='carousel'>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x600"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Image 1</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x600"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Image 2</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x600"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Image 3</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x600"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Image 4</h3>
                </Carousel.Caption>
              </Carousel.Item>
              {/* Ajoutez autant d'items de carrousel que nécessaire */}
            </Carousel>
          </div>
        </div>
      </div>

        <div className='row' id='footer'>
            <div className='col'>
                <p>&copy; Waka'a. All Rights Reserved</p>
            </div>
            <div className='col'>
            </div>
            <div className='col'>
                <p>Provided and promoted by <a href="https://www.akc-invent.cm" >AKC-Invent</a></p>
            </div>
        </div>
    </div>
    );
};

export default AdminLoginPage;