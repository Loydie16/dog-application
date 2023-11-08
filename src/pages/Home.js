import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from "react-scroll-up";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDarkMode } from '../DarkModeContext';
import logoIMG from "../resources/logo.png";
import up from "../resources/stand-up.png";


export default function Home() {
	const [dogs, setDogs] = useState([]);
	const [text, setText] = useState('');
	const [searched, setSearched] = useState(false);
	const [originalDogs, setOriginalDogs] = useState([]);
	const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the hook to access the values

	

	useEffect(() => {
		document.body.className = isDarkMode ? 'dark' : ''; // Toggle the 'dark' class on the body
	  }, [isDarkMode]);

	useEffect(() => {
		const fetchDogData = async () => {
			try {
				const res = await fetch('https://api.thedogapi.com/v1/breeds');
				const data = await res.json();
				setDogs(data);
				setOriginalDogs(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchDogData();
	}, []);

	const searchForDog = async () => {
		try {
			const res = await fetch(
				`https://api.thedogapi.com/v1/breeds/search?q=${text}`,
			);
			const data = await res.json();
			setDogs(data);
			setSearched(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			resetSearch();
		} else {
			searchForDog();
		}
	};

	const resetSearch = () => {
		setDogs(originalDogs);
		setSearched(false);
		setText('');
	};


	return (
		<>	
			
			<div className="fixed w-20 h-20 top-10 right-5 bg-slate-200 dark:bg-slate-500 pt-3 pl-3 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
			<DarkModeSwitch
				className='w-14 h-14'
				checked={isDarkMode}
				onChange={toggleDarkMode}
				onClick={toggleDarkMode}
				size={120}	
				sunColor='yellow'
			/>
			</div>
			<ScrollToTop showUnder={160} >
				<button className='rounded-t-full transition ease-in-out delay-150 bg-slate-200 hover:-translate-y-1 hover:scale-110 dark:bg-slate-400 hover:bg-slate-300 dark:hover:-translate-y-1 dark:hover:scale-110 dark:hover:bg-slate-500 duration-300 ' style={{ zIndex: '-1' }}>
					<img 
						src={up} 
						alt='dogup'
						className='w-24 h-auto p-2 z-1'
					/>
				</button>
			</ScrollToTop>
			{!dogs ? (
				<h1 classN	ame="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
					Loading...
				</h1>
			) : (
				<>
				<section className={`p-8 max-w-7xl mx-auto`}>
						<div className="text-center justify-center items-center">
							<img src={logoIMG} alt='logo' className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl w-full"/>
								
						
							{/* <p className="my-8">
								This application is powered by{''}
								<a
									href="https://thedogapi.com"
									className="text-indigo-600 underline active:text-orange-400"
								>
									The Dog Api
								</a>
							</p> */}

							<form
								className="max-w-xl mx-auto pt-10"
								autoComplete="off"
								onSubmit={handleSubmit}
							>
								<div className="max-w-xl mx-auto pt-10">
									<div className="relative">
										<input
										type="text"
										name="search"
										id="search"
										placeholder="Search for a dog breed"
										className="py-2 px-4 rounded-l-xl shadow w-full bg-slate-200 border-2 border-slate-400 dark:bg-slate-400 dark:text-white dark:placeholder-white"
										value={text}
										onChange={(e) => {
											setText(e.target.value); // Update the "text" state as the user types
											searchForDog(); // Trigger the search as the user types
										}}
										/>
										<button
										onClick={() => resetSearch()} // Add an onClick handler for the button
										className="absolute rounded-r-xl  bg-red-400 w-10 h-full text-white font-bold text-xl align-text-top cursor-pointer hover:bg-red-600"
										>
										X
										</button>
									</div>
								</div>
							</form>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
							{dogs.length === 0 && searched ? (
								<div className='absolute flex justify-center items-center top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 bg-slate-300 dark:bg-slate-500 rounded-lg'>
									<h1 className="text-slate-700 dark:text-white text-center px-5 text-3xl font-bold uppercase">
										No results found for "{text}"
									</h1>
								</div>

							) : searched ? (
								dogs.map((dog) => (
								<Link to={`/${dog.name}/${dog.id}`} key={dog.id}>
									<motion.article
									layout
									animate={{ opacity: 1 }}
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}
									whileHover={{ scale: 1 }}
									className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 p-4 rounded dark:hover-bg-slate-600"
									>
									<AnimatePresence>
										<img
										src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
										alt={dog.name}
										loading="lazy"
										className="rounded md:h-72 w-full object-cover"
										onError={(e) => {
											// If JPG image fails to load, fall back to PNG.
											e.target.src = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.png`;
										}}
										/>
										<h3 className="dark:text-white text-lg font-bold mt-4">
										{dog.name}
										</h3>
										<p className="dark:text-slate-100">
										Bred For: {dog.bred_for}
										</p>
									</AnimatePresence>
									</motion.article>
								</Link>
								))
							) : (
								dogs.map((dog) => (
								<Link to={`/${dog.name}/${dog.id}`} key={dog.id}>
									<motion.article
									layout
									animate={{ opacity: 1 }}
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}
									whileHover={{ scale: 1.1 }}
									className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 p-4 rounded dark:hover:bg-slate-600"
									>
									<AnimatePresence>
										<img
										src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
										alt={dog.name}
										loading="lazy"
										className="rounded md:h-72 w-full object-cover"
										onError={(e) => {
											// If JPG image fails to load, fall back to PNG.
											e.target.src = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.png`;
										}}
										/>
										<h3 className="dark:text-white text-lg font-bold mt-4">
										{dog.name}
										</h3>
										<p className="dark:text-slate-100">
										Bred For: {dog.bred_for}
										</p>
									</AnimatePresence>
									</motion.article>
								</Link>
								))
							)}
							</div>
						{/* <div className="hidden 2xl:flex 2xl:fixed 2xl:top-56 2xl:inset-0 2xl:items-center 2xl:justify-between 2xl:p-5" style={{ zIndex: '-1' }}>
							<img src="../resources/casual-life-3d-dog-sitting.png" alt="3dDog" className='2xl:w-72'/>
							<img src="../resources/business-3d-young-man-holding-a-dog.png" alt="3dDog" className='2xl:w-52 '/>
						</div> */}
					</section>
				</>
			)}
			
		</>
	);
}


