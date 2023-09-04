import logo from './logo.svg';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Router from './utils/Router';
import "./app.css"

function App() {
  const stripePromise = loadStripe('pk_test_51Nlt3JFGjc5KmRUJOjHm81l3BQAhgFYqgSyvNTqJjfcfu921vLTJCAQTuQfW99kSCgzpvQ8VjsF1TR2XHUf19kg500lIfC22CT');

  return (
    <Elements stripe={stripePromise}>
      <Router />
    </Elements>
  );
}

export default App;
