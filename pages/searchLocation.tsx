import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


export default function Location() {


    return (
        <div>

            <GooglePlacesAutocomplete
                apiKey="AIzaSyAMmgRzydiRmddUId4gUV68a5092C6ofwY"
                apiOptions={{ region: 'ph' }}

            />
        </div>
    )
}