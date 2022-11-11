import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando pagina de login', () => {
    test('Verifica se os componentes estão na tela', () => {
        renderWithRouterAndRedux(<App />)
        const email = screen.getByPlaceholderText(/Email/i);
        expect(email).toBeInTheDocument();
        const nome = screen.getByPlaceholderText(/Nome/i);
        expect(nome).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toBeInTheDocument();
        const button2 = screen.getByRole('button', { name: /settings/i });
        expect(button2).toBeInTheDocument();
    })
    test('Verifica se o botão inicia desativado', () => {
        renderWithRouterAndRedux(<App />)
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('disabled');
    })
    test('Verifica se o botão habilita quando os dados estão corretos', async () => {
        const token = {
            "response_code": 0,
            "response_message": "Token Generated Successfully!",
            "token": "a0309215304acc0d3e7fcb01af27293f5972afabf53c3586ffe6e3368e2e68d5"
        }

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(token),
        });

        const email = 'nazareno@gmail.com';
        const name = 'nazareno'
        renderWithRouterAndRedux(<App />)
        const button = screen.getByRole('button', { name: /play/i });
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const nomeInput = screen.getByPlaceholderText(/Nome/i);
        userEvent.type(emailInput, email)
        userEvent.type(nomeInput, name)
        expect(button).not.toHaveAttribute('disabled');
        userEvent.click(button)

        const renderGames = await screen.findByText(/olá/i)
        expect(renderGames).toBeInTheDocument()
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
    test('Testa se ao clicar em settings rendeniza a pagina de config', () => {
        const { history } = renderWithRouterAndRedux(<App />)
        const button = screen.getByRole('button', { name: /settings/i });
        expect(button).toBeInTheDocument();
        userEvent.click(button)
        expect(history.location.pathname).toBe('/settings')
        screen.logTestingPlaygroundURL();
        const pagConfig = screen.getByRole('heading', {
            name: /config/i
        })
        expect(pagConfig).toBeInTheDocument()
    })
})