import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import WelcomeBand from './WelcomeBand';

function App() {
  return (
    <>
    <div className='container mt-4'>
      <div className='row bg-primary text-white'>
        <WelcomeBand/>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter/>
        </div>
        <div className='col-md-9'>
          <BookList/>
        </div>
      </div>


    </div>
    </>
  );
}

export default App;
