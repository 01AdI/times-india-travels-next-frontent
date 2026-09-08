import AboutUs_Hero from "../AboutUs_Components/AboutUs_Hero"
import AboutUs_Who_We_Are from "../AboutUs_Components/AboutUs_Who_We_Are"
import AboutUs_FounderWords from "../AboutUs_Components/AboutUs_FounderWords"
import AboutUs_Process from "../AboutUs_Components/AbutUs_Process"
import AboutUs_Gallery from "../AboutUs_Components/AboutUs_Gallery"

export default function About_Us(){
    return(
        <>
            <AboutUs_Hero></AboutUs_Hero>
            <AboutUs_Who_We_Are></AboutUs_Who_We_Are>
            <AboutUs_FounderWords></AboutUs_FounderWords>
            <AboutUs_Process></AboutUs_Process>
            <AboutUs_Gallery></AboutUs_Gallery>
        </>
    )
}