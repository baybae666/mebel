import React from 'react';
import '../style/home.css'
import GranImage from '../assets/gran.png';
import KantryImage from '../assets/kantry.png';
import VolnaImage from '../assets/volna.png';
import CreateImage from '../assets/create.png';
import DeliveryImage from '../assets/delive.png';
import CraftImage from '../assets/craft.png';
import OrderSteps from "../components/home/OrderSteps";
import HeroSection from "../components/home/HeroSection";
import Advantages from "../components/home/Advantages";
import Examples from "../components/home/Examples";

const facadesData = [
    {id: 1, title: "Грань", image: GranImage},
    {id: 2, title: "Кантри", image: KantryImage},
    {id: 3, title: "Волна", image: VolnaImage},
];

const orderLevelsData = [
    {
        id: 1,
        title: "Производство фасадов",
        text: "Выполняется с использованием профессионального оборудования в соответствии со всеми стандартами качества",
        image: CreateImage
    },
    {
        id: 2,
        title: "Доставка",
        text: "Также включает в себя подъем бережно упакованной продукции",
        image: DeliveryImage
    },
    {
        id: 3,
        title: "Сборка",
        text: "Производится квалифицированными специалистами с многолетним опытом",
        image: CraftImage
    },
];
const Home = () => {

    return (
        <div className="home bg-[#eee]">
            <HeroSection/>
            <Advantages/>
            <Examples facadesData={facadesData} />
            <OrderSteps orderLevelsData={orderLevelsData}/>
        </div>
    );
};

export default Home;