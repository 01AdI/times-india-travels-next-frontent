import Tour_Grid from "../TourPackages_Components/Tour_Grid";
import Tour_Hero from "../TourPackages_Components/Tour_Hero";

export default function TourPackage({ initialCategories = [] }){
    return(
        <>
        <Tour_Hero></Tour_Hero>
            <Tour_Grid initialCategories={initialCategories}></Tour_Grid>
        </>
    )
}