import Contact_Us_FindUs from "../Contact_Us_Components/Contact_Us_FindUs";
import Contact_Us_Form from "../Contact_Us_Components/Contact_Us_Form";
import Contact_Us_PlanJourney_2 from "../Contact_Us_Components/Contact_Us_Form_2";
import Contact_Us_Hero from "../Contact_Us_Components/Contact_Us_Hero";
import Contact_Us_IndiaIsNotADestination from "../Contact_Us_Components/Contact_Us_India";
import Contact_Us_LetsConnect from "../Contact_Us_Components/Contact_Us_Lets_Connect";
import Contact_Us_NextJourney from "../Contact_Us_Components/contact_Us_NextJourny";

export default function ContactUs(){
    return(
        <>
            <Contact_Us_Hero></Contact_Us_Hero>
            <Contact_Us_LetsConnect></Contact_Us_LetsConnect>
            <Contact_Us_Form></Contact_Us_Form>
            <Contact_Us_IndiaIsNotADestination></Contact_Us_IndiaIsNotADestination>
            <Contact_Us_FindUs></Contact_Us_FindUs>
            <Contact_Us_NextJourney></Contact_Us_NextJourney>
        </>
    )
}