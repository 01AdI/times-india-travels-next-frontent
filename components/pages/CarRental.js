import CarRental_content from "../CarRental_Components/CarRental_Context";
import CarRental_Enquiry_CTA from "../CarRental_Components/CarRental_Enquiry_CTA";
import CarRental_Fleet from "../CarRental_Components/CarRental_Fleet";
import CarRental_Hero from "../CarRental_Components/CarRental_hero";
import CarRental_Terms_Cond from "../CarRental_Components/CarRental_Terms&Cond";
import CarRental_WhatsIncluded from "../CarRental_Components/CarRental_WhatsIncluded";


export default function CarRental(){
    return(
        <>
        <CarRental_Hero></CarRental_Hero>
            <CarRental_content></CarRental_content>
            <CarRental_Fleet></CarRental_Fleet>
            <CarRental_WhatsIncluded></CarRental_WhatsIncluded>
            <CarRental_Enquiry_CTA></CarRental_Enquiry_CTA>
            <CarRental_Terms_Cond></CarRental_Terms_Cond>
        </>
    )
}