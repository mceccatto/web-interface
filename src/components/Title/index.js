function Title({ titulo, texto }) {
    return (
        <div className="Title mb-5">
            <div className="px-4 py-1 my-1 text-center">
                <h5 className="fw-bold">{titulo}</h5>
                <div className="col-lg-6 mx-auto">
                    <small className="mb-4">{texto}</small>
                </div>
            </div>
        </div>
    );
}

export default Title;