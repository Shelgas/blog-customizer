import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type StateProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: StateProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(
				styles.container,
				props.isOpen ? styles.container_open : ''
			)}
			onClick={props.onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
