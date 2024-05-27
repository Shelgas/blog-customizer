import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setNewSettings: (newSettings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	setNewSettings,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleStyleState, setArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const arrowButtonHandler = () => setIsMenuOpen(!isMenuOpen);

	const optionSelected =
		(optionName: keyof ArticleStateType) => (selected: OptionType) => {
			setArticleStyleState((prevState) => ({
				...prevState,
				[optionName]: selected,
			}));
		};

	const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setNewSettings(articleStyleState);
		setIsMenuOpen(false);
	};

	const resetForm = (evt: React.FormEvent) => {
		evt.preventDefault();
		setNewSettings(defaultArticleState);
		setArticleStyleState(defaultArticleState);
		setIsMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={arrowButtonHandler} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					isMenuOpen ? styles.container_open : ''
				)}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={articleStyleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={optionSelected('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={articleStyleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={optionSelected('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleStyleState.fontColor}
						options={fontColors}
						onChange={optionSelected('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={articleStyleState.backgroundColor}
						options={backgroundColors}
						onChange={optionSelected('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={articleStyleState.contentWidth}
						options={contentWidthArr}
						onChange={optionSelected('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
