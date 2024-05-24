import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const arrowButtonHalndler = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={arrowButtonHalndler} />
			<aside
				className={`${styles.container} 
				${isMenuOpen && styles.container_open}`}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
