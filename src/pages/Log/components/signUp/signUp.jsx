import React, { useState } from "react";
import axios from "axios";
import "./signUp.scss";

const SignUp = () => {
	const [ formSubmit, setFormSubmit ] = useState( false );
	const [ firstName, setFirstName ] = useState( "" );
	const [ lastName, setLastName ] = useState( "" );
	const [ email, setEmail ] = useState( "" );
	const [ password, setPassword ] = useState( "" );
	const [ controlPassword, setControlPassword ] = useState( "" );

	const handleRegister = async ( e ) => {
		e.preventDefault();
		const emailError = document.querySelector( ".email-error" );
		const passwordError = document.querySelector( ".password-error" );
		const controlPasswordError = document.querySelector(
			".controlPassword-error"
		);

		if ( password !== controlPassword ) {
			controlPasswordError.insertAdjacentHTML(
				"afterbegin",
				"les mots de passe ne corrrespondent pas"
			);
		}

		await axios( {
			method: "post",
			url: `${ process.env.REACT_APP_API_URL }api/user/register`,
			withCredentials: true,
			data: {
				email,
				firstName,
				lastName,
				password,
			},
		} )
			.then( ( res ) => {
				console.log( res );
				if ( res.data.errors ) {

					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					setFormSubmit( true );
				}
			} )
			.catch( ( err ) => {
				console.log( err );
			} );

	};
	return (
		<>
			<div className="signup">
				<div className="signup-wrapper flex">
					<h1 className="create-acc">Créer un compte</h1>
					<div className="signup-form flex">
						<h3 className="title">Bienvenue sur le workplace Groupomania !</h3>
						<form action="" onSubmit={ handleRegister } className="signup-fields">
							<label htmlFor="email">Email :</label>
							<input
								type="email"
								className="single-field"
								onChange={ ( e ) => setEmail( e.target.value ) }
								value={ email }
							/>
							<div className="email-error"></div>
							<div className="fn-field">
								<label htmlFor="prénom">Prénom: </label>
								<input
									type="text"
									className="single-field"
									onChange={ ( e ) => setFirstName( e.target.value ) }
									value={ firstName }
								/>
								<div className="firstName-error"></div>
							</div>
							<div className="ln-field">
								<label htmlFor="nom">Nom: </label>
								<input
									type="text"
									className="single-field"
									onChange={ ( e ) => setLastName( e.target.value ) }
									value={ lastName }
								/>
								<div className="lastName-error">ezaeazeaze</div>
							</div>
							<div className="password-field">
								<label htmlFor="password">Mot de passe: </label>
								<input
									type="password"
									className="single-field"
									onChange={ ( e ) => setPassword( e.target.value ) }
									value={ password }
									minLength="6"
									required
								/>
								<div className="password-error"></div>
							</div>
							<div className="confirm-field">
								<label htmlFor="password">Confirmez le Mot de passe: </label>
								<input
									type="password"
									className="single-field"
									onChange={ ( e ) => setControlPassword( e.target.value ) }
									value={ controlPassword }
									minLength="6"
									required
								/>
								<div className="controlPassword-error"></div>
							</div>
							<div className="btn flex">
								<button type="submit " className="submit-btn">
									Créer un compte
								</button>
								{ formSubmit && (
									<>
										<h4 className="success">
											Enregistrement réussi, veuillez-vous connecter
										</h4>
									</>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
