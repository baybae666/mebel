import React from 'react';
import '../style/footer.css';
import { NavLink } from "react-router-dom";
import { ABOUTROUTER, CATALOGROUTER, HOMEROUTER } from "../utils/consts";
import LocationIcon from '../assets/footerLocation.svg';
import PhoneIcon from '../assets/phone.svg';
import MailIcon from '../assets/mail.svg';

const Footer = () => {
    return (
        <div className="footer w-screen text-white py-6">
            <div className="footer_container flex flex-wrap justify-between items-start mx-auto px-4 lg:px-12">
                <div className="footer_logo w-full lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
                    <div className="logo"></div>
                </div>
                <div className="footer_info_box w-full lg:w-2/3 flex flex-wrap justify-between items-start gap-4">
                    <div className="footer_section w-full sm:w-1/2 lg:w-2/5">
                        <h2 className="footer_info_text mb-4">НАВИГАЦИЯ</h2>
                        <ul className="space-y-2">
                            <NavLink to={HOMEROUTER} className="footer_link">
                                <span className="mr-2">{'>'}</span> Главная
                            </NavLink>
                            <NavLink to={CATALOGROUTER} className="footer_link">
                                <span className="mr-2">{'>'}</span> Каталог
                            </NavLink>
                            <NavLink to={ABOUTROUTER} className="footer_link">
                                <span className="mr-2">{'>'}</span> О компании
                            </NavLink>
                        </ul>
                    </div>
                    <div className="footer_section w-full sm:w-1/2 lg:w-2/5">
                        <h2 className="footer_info_text mb-4">КОНТАКТЫ</h2>
                        <ul className="space-y-3">
                            <li className="footer_contact_item">
                                <img src={LocationIcon} alt="Location" className="icon mr-2" />
                                Екатеринбург, ул. Окружная, 88
                            </li>
                            <li className="footer_contact_item">
                                <img src={PhoneIcon} alt="Phone" className="icon mr-2" />
                                +7 (908) 638-46-10 | +7 (908) 637-12-32
                            </li>
                            <li className="footer_contact_item">
                                <img src={MailIcon} alt="Email" className="icon mr-2" />
                                tfasad96@mail.ru
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
