import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostsGerman from './german/posts-german';
import ToggleBtnGerman from './toggle-btn-german';

function BlogGerman() {
    const posts = useSelector((state) => state.post.german);
    const numberOfPages = useSelector((state) => state.post.numberOfPagesGerman);
    const errorMessage = useSelector((state) => state.post.errorMessage);

    function renderToggleBtns() {
        const toggleBtns = [];

        for (let i = 0; i < numberOfPages; i++) {
            toggleBtns.push(<ToggleBtnGerman index={i} />);
        }

        return toggleBtns;
    }

    useEffect(() => {
        document.title = 'Blog';
    });

    return (
        <main>
            <div className="row">
                {/* Länkstig */}
                <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
                    <ul>
                        <li><Link id="first-breadcrumb" className="inactive-breadcrumb focus 
                            focus-invisible regular-font-size" to={"/"}>Home</Link>/</li>
                        <li><Link className="active-breadcrumb focus focus-invisible 
                            regular-font-size" to={"/blog"}> Blog</Link></li>
                    </ul>
                </nav>
            </div>
            <section id="blog">
                <h1 id="main" className="h1-font-size">Blog</h1>
                {posts.length ? <PostsGerman /> : <p className="error regular-font-size" 
                    role="alert">{errorMessage}</p>}
                {numberOfPages > 1 ? <nav aria-label="Blog-Posts">{renderToggleBtns()}</nav> : null}                  
            </section>
        </main>
    );

    /*
    toggleBtnsGerman() {
        let buttons = [];

        if (this.state.numberOfPagesGerman > 1) {
            for (let i = 1; i <= this.state.numberOfPagesGerman; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeBlogPageGerman') == 1 || !localStorage.getItem('activeBlogPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeBlogPageGerman') != i || !localStorage.getItem('activeBlogPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeBlogPageGerman')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        }

        return buttons;
    }

    toggleBtnsSwedish() {
        let buttons = [];

        if (this.state.numberOfPagesSwedish > 1) {
            for (let i = 1; i <= this.state.numberOfPagesSwedish; i++) {
                if (i == 1) {
                    if (localStorage.getItem('activeBlogPageSwedish') == 1 || !localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    }
                } else {
                    if (localStorage.getItem('activeBlogPageSwedish') != i || !localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn inactive-toggle-btn h3-font-size"
                        aria-pressed="false" onClick={this.handleBtnClick}>{i}</button>);
                    
                    } else if (i == localStorage.getItem('activeBlogPageSwedish')) {
                        buttons.push(<button key={i} id={`btn${i}`} className="focus focus-invisible-btns toggle-btn active-toggle-btn h3-font-size"
                        aria-pressed="true" onClick={this.handleBtnClick}>{i}</button>);
                    }
                }
            }
        
        }

        return buttons;
    }

    handleBtnClick(e) {
        const id      = e.target.id.slice(3);
        const buttons = document.getElementsByClassName('toggle-btn');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML == id) {
                buttons[i].className = 'focus toggle-btn active-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', true);

            } else {
                buttons[i].className = 'focus toggle-btn inactive-toggle-btn h3-font-size';
                buttons[i].setAttribute('aria-pressed', false);
            }
        }

        if (localStorage.getItem('language') == 'Deutsch') {
            this.togglePostsGerman(id);
        
        } else {
            this.togglePostsSwedish(id);
        }
    }
    
    togglePostsGerman(id) {
        if (id == 1) {
            localStorage.setItem('blogIndexGerman', 0);
            localStorage.setItem('activeBlogPageGerman', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        } else {
            localStorage.setItem('blogIndexGerman', (id - 1) * 5);
            localStorage.setItem('activeBlogPageGerman', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }

    togglePostsSwedish(id) {
        if (id == 1) {
            localStorage.setItem('blogIndexSwedish', 0);
            localStorage.setItem('activeBlogPageSwedish', 1);

            this.setState({
                index:      0,
                activePage: 1,
            })
        
        } else {
            localStorage.setItem('blogIndexSwedish', (id - 1) * 5);
            localStorage.setItem('activeBlogPageSwedish', id);

            this.setState({
                index:      (id - 1) * 5,
                activePage: id,
            })
        }
    }
    */
}

export default BlogGerman;