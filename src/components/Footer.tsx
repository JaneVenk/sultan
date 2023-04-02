import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <React.Fragment>
      <div className="footer-background"></div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-left-part">
              <img src="/sultan/images/footer/logo.svg"></img>
              <p className="footer-left-part-text">
                Компания «Султан» — снабжаем розничные магазины товарами "под
                ключ" в Кокчетаве и Акмолинской области
              </p>
              <p className="footer-left-part-sub">
                Подпишись на скидки и акции
              </p>
              <input placeholder="Введите ваш E-mail"></input>
              <img
                className="footer-left-part-inputicon"
                src="/sultan/images/footer/inputicon.svg"
              ></img>
            </div>

            <div className="footer-right-part">
              <div className="footer-right-part-menu">
                <p className="footer-right-part-title">Меню сайта:</p>
                <div className="footer-right-part-menu-items">
                  <p>О компании</p>
                  <p>Доставка и оплата</p>
                  <p>Возврат</p>
                  <p>Контакты</p>
                </div>
              </div>

              <div className="footer-right-part-category">
                <p className="footer-right-part-title">Категории:</p>
                <div className="footer-right-part-category-items">
                  <p>Бытовая химия</p>
                  <p>Косметика и гигиена</p>
                  <p>Товаря для дома</p>
                  <p>Товары для детей и мам</p>
                  <p>Посуда</p>
                </div>
              </div>

              <div className="footer-right-part-downloadpl">
                <p className="footer-right-part-title">Скачать прайс-лист:</p>
                <button>
                  <div className="footer-right-part-downloadpl-button-inner">
                    <p>Прайс-лист</p>
                    <img src="/sultan/images/footer/downloadicon.svg"></img>
                  </div>
                </button>
                <p className="footer-right-part-downloadpl-connection">
                  Связь в мессенджерах:
                </p>
                <img src="/sultan/images/footer/whatsup.svg"></img>
                <img
                  className="telegram"
                  src="/sultan/images/footer/telegram.svg"
                ></img>
              </div>

              <div className="footer-right-part-contacts">
                <p className="footer-right-part-title">Контакты:</p>
                <p className="footer-right-part-contact-phone">
                  +7 (777) 490-00-91
                </p>
                <p className="footer-right-part-contact-worktime">
                  время работы: 9:00-20:00
                </p>
                <p className="footer-right-part-contacts-order">
                  Заказать звонок
                </p>
                <p className="footer-right-part-contacts-email">
                  opt.sultan@mail.ru{" "}
                </p>
                <p className="footer-right-part-contacts-connect">
                  На связи в любое время
                </p>

                <img src="/sultan/images/footer/Visa.svg"></img>
                <img className="master" src="/sultan/images/footer/master.svg"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
