import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/components/spinners.module.scss';

export default function Spinners() {
  return <div></div>;
}

export function SmallSpinner({size}){
    return(
        <FontAwesomeIcon icon={faSpinner} size={size} className={styles['small-spinner']}/>
    )
}
