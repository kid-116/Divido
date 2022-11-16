export default function CarCard(props) {
    const API_KEY = 'd0a74699e3ef4efcb52d4d4f41ca388b'
    
    function getImage() {
        return `https://maps.geoapify.com/v1/staticmap?width=500&height=400&marker=lonlat:${props.car['longitude']},${props.car['latitude']}&apiKey=${API_KEY}`;
    }

    return (
        <div class="option" id={`car-${props.car['id']}`} style={{ '--optionBackground': `url(${getImage()}` }} onClick={() => { props.handleClick(props.car['id']) }}>
            <div class="shadow"></div>
            <div class="label">
                <div class="icon" onClick={() => {
                    window.open('https://www.google.com/maps/search/?api=1&query=' + props.car.latitude + ',' + props.car.longitude);
                }}>
                    <i class="fa-solid fa-car"></i>
                </div>
                <div class="info">
                    <div id={`car-model-${props.car['id']}`}>{props.car['model']}</div>
                    <div id={`car-sub-${props.car['id']}`}>{`${props.car['latitude']},${props.car['longitude']}`}</div>
                </div>
            </div>
        </div>
    )
}
