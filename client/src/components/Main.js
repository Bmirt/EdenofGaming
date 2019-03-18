import React from 'react';
import Slider from './Slider'


class Main extends React.Component{
    render(){
        return(
            <React.Fragment>
                <main className="main">
                    <section className="main__top">
                        <Slider/>
                    </section>
                </main>
            </React.Fragment>
        )
    }
}

export default Main;