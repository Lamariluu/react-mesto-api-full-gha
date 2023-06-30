import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import * as auth from '../utils/Auth';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import resolve from '../images/right.svg';
import reject from '../images/wrong.svg';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    //const token = localStorage.getItem("jwt");
    //if (token) {
      if (isLoggedIn === false) {
        return;
      }
      api.getUserInfo()
        .then(profileData => setCurrentUser(profileData))
        .catch(err => console.log(err))
      api
        .getInitialCards()
        .then((cardData) => {
          setCards(cardData.map((card) => card));
        })
        .catch(err => console.log(err))
    //}
  }, [isLoggedIn]);

  function onRegister(email, password) {
    auth
      .registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  // ПОСЛЕ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ, НЕ ТРЕБУЕТСЯ АВТОРИЗАЦИЯ
  useEffect(() => {
    const token = localStorage.getItem("jwt"); //было const jwt = localStorage.getItem("jwt");
    if (token) {
      auth.getToken(token).then((res) => { //было auth.getToken(jwt).then((res) =>
        //console.log({ res })
        if (res) {
          setIsLoggedIn(true);
          //navigate("/");
          setEmailName(res.email); //было setEmailName(res.data.email)
        }
      })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  //useEffect(() => {
  //  const token = localStorage.getItem("jwt"); //было const jwt = localStorage.getItem("jwt");
  //  if (token) {
  //    auth.getToken().then((res) => { //было auth.getToken(jwt).then((res) =>
  //      //console.log({ res })
  //      if (res) {
  //        setIsLoggedIn(true);
  //        navigate("/");
  //        setEmailName(res.email);
  //      }
  //    })
  //      .catch((err) => {
  //        console.error(err);
  //      });
  //    api.getUserInfo()
  //      .then(profileData => {
  //        setCurrentUser(profileData))
  //      .catch(err => console.log(err))
  //    api
  //      .getInitialCards()
  //      .then((cardData) => {
  //        setCards(cardData.map((card) => card));
  //      })
  //      .catch(err => console.log(err))
  //}
  //}, [navigate, isLoggedIn]);

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  };

  //const handleCardLike = (card) => {
  //  const isLiked = card.likes.some(user => user._id === currentUser._id);
  //  api
  //    .addLike(card._id, !isLiked)
  //    .then((newCard) => {
  //      setCards((state) => {
  //        return state.map((item) => item._id === card._id ? newCard : item)
  //      });
  //    })
  //    .catch(err => console.log(err))
  //};

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((item) => item._id === card._id ? newCard : item)
        });
      })
      .catch(err => console.log(err))
  };

  const handleCardDelete = (card) => {
    api
      .deleteItem(card._id)
      .then(() =>
        setCards(state =>
          state.filter(item => item._id !== card._id)))
      .catch(err => console.log(err))
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleEditAvatar = (changeAvatar) => {
    setIsLoading(true);
    api
      .setUserAvatar(changeAvatar)
      .then(data => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .createItem({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" onClick={() => { navigate("/sign-up") }} />
                <Login onLogin={onLogin} />
              </>
            } />

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" onClick={() => { navigate("/sign-in") }} />

                <Register onRegister={onRegister} />
              </>
            } />

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  isLogged={isLoggedIn}
                  cards={cards}
                  component={Main}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            } />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            onLoading={isLoading}
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onEditAvatar={handleEditAvatar}
            onLoading={isLoading}
          ></EditAvatarPopup>

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonSubmit="Да"
            onClose={closeAllPopups}
          >
          </PopupWithForm>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            onLoading={isLoading}
          ></AddPlacePopup>

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;