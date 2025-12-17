'use client'

export default function Products(){

    const Description = {
        Docker: "aaaaaaaa",
        data2: "aaaaaaaa",
        data3: "aaaaaaaa",
        data4: "aaaaaaaa",
        data5: "aaaaaaaa",
        data6: "aaaaaaaa",
        data7: "aaaaaaaa",
        data8: "aaaaaaaa",
        data9: "aaaaaaaa",

    }

    const ArrDes = Object.keys(Description)
    return(
        <>
            <div className="section-container">
                <div className="sectionn-header">
                    <h2>Shop Our Seletion</h2>
                    <p>Accessorization</p>
                </div>

                <div className="planner-content">
                    <div>
                        <button className="img-button">
                            <img src="low_res/planner.jpeg" alt="high-res-planner"/>
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">Product header</p>
                        <h3><span>$</span>9.99</h3>
                        <p>Description</p>
                        <ul>
                            <li>title</li>
                            <li>info</li>
                        </ul>
                    </div>
                    <div className="purchase-btns">
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>

            <div className="section-container">
                <div className="sectionn-header">
                    <h2>Collect Your Favorite</h2>
                    <p>custom design tech</p>
                </div>
                <div className="sticker-container">
                    {ArrDes.map((s,sIndex) => {
                        return(
                            <div key={sIndex} className="card">
                                <button className="img-button">
                                    <img src={`low_res/${s}.jpeg`} alt={`${s}-low-res`}/>
                                </button>
                                <div className="s-info">
                                    <p className="text-medium">{s.replaceAll('_',' ')} <sticker className="png"></sticker> </p>
                                    <p>{Description[s]}</p>
                                    <h4><span>$</span>9.99</h4>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}