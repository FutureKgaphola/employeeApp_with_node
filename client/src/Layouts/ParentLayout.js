import { Outlet} from 'react-router-dom';


const ParentLayout = () => {
    return ( 
        <div className="ParentLayout">
            
            <main>
                <Outlet/>
            </main>

        </div>
     );
}
 
export default ParentLayout;