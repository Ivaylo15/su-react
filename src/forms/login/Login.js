import React from 'react';
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import styles from '../register/register.module.css';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }


    static contextType = UserContext;


    handleEmailChange = event => {
        this.setState(
            {
                email: event.target.value,
            });
    }

    handlePasswordChange = event => {
        this.setState(
            {
                password: event.target.value
            });
    }

    handleSubmite = event => {
        event.preventDefault();

        const { email, password } = this.state;
        const body = {
            username: email,
            password: password
        }
        servises.login(body, this.context,() => this.props.history.push('/profile'));
    }

    render() {
        const { email, password } = this.state;
        const { lang } =this.context
        console.log(lang)
        return (
            <div className={styles.Forms}>
                <h1>{lang === 'en' ? 'Login Page' : 'Вход'}</h1>
                <form onSubmit={this.handleSubmite}>
                    <div className={styles["form-control"]}>
                        <label>{lang === 'en' ? 'Email' : 'Имейл'}</label>
                        <input type="email" onChange={this.handleEmailChange} value={email} />
                    </div>
                    <div className={styles["form-control"]}>
                        <label>{lang === 'en' ? 'Password' : 'Парола'}</label>
                        <input type="password" onChange={this.handlePasswordChange} value={password} />
                    </div>
                    <div className="Forms-Form">
                        <button type="submit">{lang === 'en' ? 'Login' : 'Вход'}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;
