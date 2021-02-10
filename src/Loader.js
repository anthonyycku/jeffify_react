import './loader.css'

export default function Loader() {

    return (
        <div>
            <div className="loadingComponent">
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div className="loadingText">
                <h4>Heroku is loading...</h4>
                <h5>This could take a while!</h5>
            </div>
        </div>
    )
}