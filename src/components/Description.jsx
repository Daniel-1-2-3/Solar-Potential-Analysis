import React from 'react';
import "../index.css"
import mono from "../assets/mono-panel.jpg"
import poly from "../assets/poly-panel.jpg"
import thin from "../assets/thin-panel.jpg"

const Description = () => {
    const Card = ({ title, priceRange, details, imgSrc}) => (
        <div className="card w-18rem">
            <img src={imgSrc} className="card-img-top" alt={title}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <ul className="list-disc list-inside">
                    <li className="card-text font-bold">{priceRange}</li>
                    {details.map((detail, index) => (
                        <li key={index} className="card-text">{detail}</li>
                    ))}
                </ul>
            </div>
        </div>
);
const monocrystallineDetails = [
        'Typically 15-20% efficiency, ⠀⠀some models exceed 22%.',
        'Lasts 25 years or more.',
        'Better performance in low ⠀⠀light conditions compared ⠀⠀to other panel types.',
        'Performance can degrade at ⠀⠀higher temperatures.',
    ];

    const polycrystallineDetails = [
        'Efficiency typically around ⠀⠀13-16%.',
        'Lasts 25 years or more.',
        'Slightly reduced ⠀⠀performance in low light ⠀⠀conditions compared to ⠀⠀monocrystalline panels.',
        'Efficiency can drop more ⠀⠀significantly in high ⠀⠀temperatures.',
    ];
    const thinFilmDetails = [
        'Efficiency typically around ⠀⠀10-12%.',
        'Flexible and lightweight.',
        'Lower cost compared to ⠀⠀silicon-based panels.',
        'Shorter lifespan, usually ⠀⠀around 10-15 years.',
        'Better performance in high ⠀⠀temperatures and partial ⠀⠀shading.',
    ];
        return (
            <div className="container mx-auto mt-4">
                <div className="flex flex-wrap justify-center">
                <Card
                    title="Monocrystalline"
                    priceRange="$1 - $1.50 per watt"
                    details={monocrystallineDetails}
                    imgSrc={mono}
                />
                <Card
                    title="Polycrystalline"
                    priceRange="$0.9 - $1.50 per watt"
                    details={polycrystallineDetails}
                    imgSrc={poly}
                />
                <Card className="text-align: justify;"
                    title="Thin Film"
                    priceRange="$0.5 - $1.50 per watt"
                    details={thinFilmDetails}
                    imgSrc={thin}
                />
                </div>
            </div>
        );
}

export default Description;