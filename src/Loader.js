import './loader.css'

export default function Loader() {

    return (
        <div>
            <div className="loadingComponent">
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div className="loadingText">
                <h4>Heroku / API is loading...</h4>
            </div>
        </div>
    )
}