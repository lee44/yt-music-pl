import './App.css';
import SearchPlaylist from './components/SearchPlaylist';

function App() {
	return (
		<div className='container mx-auto h-screen'>
			<div className='flex flex-col justify-center items-center h-full'>
				<SearchPlaylist></SearchPlaylist>
			</div>
		</div>
	);
}

export default App;
