import Link from "next/link";
import { useRouter } from "next/router";

const Leftnav = () => {
    const router=useRouter()
        return (
        <div className="col-md-3">
            <div className="left-side">
                <ul>
                <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/dashboard' ? 'active' : ''}`}>
                        <Link className="nav-link" href={`/${router?.query?.page}/user/dashboard`}>
                            <a>Dashboard</a>
                        </Link>
                    </li>
                <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/downline' ? 'active' : ''}`}>
                        <Link className="nav-link" href={`/${router?.query?.page}/user/downline`}>
                            <a>Downline</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/commissions' ? 'active' : ''}`}>
                        <Link className="nav-link" href={`/${router?.query?.page}/user/commissions`}>
                            <a>Commissions</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/refundreport' ? 'active' : ''}`}>
                        <Link className="nav-link" href={`/${router?.query?.page}/user/refundreport`}>
                            <a>Refunds Report</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/commission-report' ? 'active' : ''}`}>
                        <Link className="nav-link" href={`/${router?.query?.page}/user/commission-report`}>
                            <a>Commissions Report</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/profile' ? 'active' : ''}`}>
                        <Link className="nav-link" exact href={`/${router?.query?.page}/user/profile`}>
                            <a>Profile</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+router?.query?.page+'/user/order' || router?.query?.orderid >0  ? 'active' : ''}`}>
                        <Link className="nav-link" exact href={`/${router?.query?.page}/user/order`}>
                            <a>Orders</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+ router?.query?.page +'/user/autoshiporder'  ? 'active' : ''}`}>
                        <Link className="nav-link" exact href={`/${router?.query?.page}/user/autoshiporder`}>
                            <a>AutoShip Orders</a>
                        </Link>
                    </li>
                    <li className={`nav-item ${router?.asPath === '/'+ router?.query?.page +'/user/address' ? 'active' : ''}`}>
                        <Link className="nav-link" exact href={`/${router?.query?.page}/user/address`}>
                            <a>Addresses</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Leftnav;