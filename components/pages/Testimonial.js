import Create_Testimonial_CTA from "../Testimonial_Components/Create_Testimonial_CTA";
import Testimonial_Cards from "../Testimonial_Components/Testimonial_Cards";
import Testimonial_CTA from "../Testimonial_Components/Testimonial_CTA";
import Testimonial_Hero from "../Testimonial_Components/Testimonial_hero";
import Testimonial_Intro from "../Testimonial_Components/Testimonial_Intro";
import { testimonials_review } from "../../utils/Testimonial_data";


export default function Testimonials({ initialTestimonials = [] }){
    return(
        <>
            <Testimonial_Hero></Testimonial_Hero>
            <Testimonial_Intro></Testimonial_Intro>
            <Create_Testimonial_CTA></Create_Testimonial_CTA>
            <Testimonial_Cards initialTestimonials={initialTestimonials}></Testimonial_Cards>
            <Testimonial_CTA></Testimonial_CTA>
        </>
    )
}