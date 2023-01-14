import Spinner from 'react-bootstrap/Spinner';
import './Common.css'

export interface LoadingProps {
}
export const Loading: React.FC<LoadingProps> = ({
}) => {
    return (
        <div className='center'>
            <h1>Loading...</h1>
            <Spinner animation="border" variant="dark" />
        </div>
    )
}