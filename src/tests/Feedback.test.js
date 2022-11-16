import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

describe('Testa Feedback',()=>{
  test('Quando erra todas',()=>{
    const state={
    player:{
  name: '', 
  assertions: 0, 
  score: 0, 
  email: '',
}};
    renderWithRouterAndRedux(<Feedback />,state)
    const a = screen.getByTestId("header-profile-picture");
    expect(a).toBeInTheDocument();
    const b = screen.getByTestId("header-player-name");
    expect(b).toBeInTheDocument();
    const c = screen.getByTestId("header-score");
    expect(c).toBeInTheDocument();
    const d = screen.getByTestId("feedback-text");
    expect(d).toBeInTheDocument();
    expect(d).toHaveTextContent('Could be better...')
    const e = screen.getByTestId('feedback-total-score')
    expect(e).toHaveTextContent('0')
  })

  test('Quando acerta todas',()=>{
    const state={
    player:{
  name: '', 
  assertions: 4,  
  email: '',
}};
    renderWithRouterAndRedux(<Feedback />,state)
    const a = screen.getByTestId("header-profile-picture");
    expect(a).toBeInTheDocument();
    const b = screen.getByTestId("header-player-name");
    expect(b).toBeInTheDocument();
    const c = screen.getByTestId("feedback-text");
    expect(c).toBeInTheDocument();
    expect(c).toHaveTextContent('Well Done!')
    const d = screen.getByTestId('feedback-total-question')
    expect(d).toHaveTextContent('4')
  })

  test('Botão jogar novamente',async()=>{
    const { history }=renderWithRouterAndRedux(<Feedback />);
    const a = screen.getByTestId('btn-play-again');
    expect(a).toHaveTextContent('Play Again');
    userEvent.click(a);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  test('Botão mostrar ranking',async()=>{
    const {history}=renderWithRouterAndRedux(<Feedback />);
    const a = screen.getByTestId('btn-ranking');
    expect(a).toHaveTextContent('Ranking');
    userEvent.click(a);
    const { pathname } = history.location;
    expect(pathname).toBe('/Ranking');
  })
})