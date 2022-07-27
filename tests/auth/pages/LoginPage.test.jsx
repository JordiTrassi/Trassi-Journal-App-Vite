import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => { 
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),            // Cuando se llama useDispatch regresa la función personalizada y esta recibe una función y la mandamos a llamar
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {                   // Podemos establecer el estado del store que necesitamos para la pruebas
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {
      
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug()
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('Boton de google debe de llamar a startGoogleSignIn', () => {
      
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('Submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'jordi@algo.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');             // Hemos colocado el 'data-testid' en el componente para que pueda detectarlo
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);
      
        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        });
    });
  
});
