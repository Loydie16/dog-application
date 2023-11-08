import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDarkMode } from '../DarkModeContext';


export default function SingleDog ({
  autoSlide = true,
  autoSlideInterval = 3000,
}) {
  const [dog, setDog] = useState([]);
  const [dogImages, setDogImages] = useState([]);
  const { name, id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the hook to access the values

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);


  const nextImage = () => {
    if (currentImageIndex < dogImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextImage, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`,
        );
        const data = await res.json();
        setDog(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleDogData();
  }, [name]);

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=5&breed_ids=${id}&api_key=live_zO3BRV3KApVAPkGpJ7bPTInE3eADYpkpscpqL3ErFry6rX3oL4F0dTZ0xFdAfjcb`,
        );
        const data = await res.json();
        setDogImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogImages();
  }, [id]);

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
      <section className={`max-w-5xl mx-auto flex items-center justify-center h-screen`}>
        <div className="grid grid-cols-1 gap-8 p-8 m-5 md:grid-cols-2 md:place-items-center bg-slate-100 dark:bg-slate-600 rounded-xl">
          {dogImages.map((images, index) => (
            <div
              key={images.id}
              style={{
                display: index === currentImageIndex ? 'block' : 'none',
              }}
            >
              <article className="overflow-hidden relative flex transition-transform ease-out duration-500">
                <img
                  src={images.url}
                  alt={images.name}
                  onError={(e) => {
                    // If JPG image fails to load, fall back to PNG.
                    e.target.src = images.url;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevImage}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                  >
                    <ChevronRight size={40} />
                  </button>
                </div>

                <div className="absolute bottom-4 right-0 left-0">
                  <div className="flex items-center justify-center gap-2">
                    {dogImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleImageClick(i)} // Attach a click event handler
                        className={`
          transition-all w-3 h-3 bg-white rounded-full
          ${currentImageIndex === i ? 'p-2' : 'bg-opacity-50'}
        `}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}

          {dog.map((item) => (
            <div key={item.id}>
              {/* <article>
              <img
                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
                onError={(e) => {
                  // If JPG image fails to load, fall back to PNG.
                  e.target.src = `https://cdn2.thedogapi.com/images/${item.reference_image_id}.png`;
                }}
              />
            </article> */}
              <article>
                <h1 className="text-3xl font-bold dark:text-white mb-8 lg:text-5xl">
                  {item.name}
                </h1>
                {item.description && (
                  <p className="dark:text-slate-400 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
                    {item.description}
                  </p>
                )}

                <ul className="text-sm dark:text-slate-400 leading-loose lg:text-base lg:leading-relaxed">
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Bred For:
                    </span>{' '}
                    {item.bred_for}
                  </li>
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Height:
                    </span>{' '}
                    {item.height.metric} cm
                  </li>
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Weight:
                    </span>{' '}
                    {item.weight.metric} kgs
                  </li>
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Breed Group:
                    </span>{' '}
                    {item.breed_group}
                  </li>
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Lifespan:
                    </span>{' '}
                    {item.life_span}
                  </li>
                  <li>
                    <span className="font-bold dark:text-slate-200">
                      Temperament:
                    </span>{' '}
                    {item.temperament}
                  </li>
                </ul>

                <Link
                  to="/"
                  className="inline-block bg-slate-300 hover:bg-slate-400  dark:bg-slate-700 py-2 px-6 rounded mt-8 dark:text-white dark:hover:bg-slate-500 transition-all duration-200"
                >
                  &larr; Back
                </Link>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

