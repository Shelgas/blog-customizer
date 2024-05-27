import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import clsx from 'clsx';

export const App = () => {
	const [articleStyleState, setArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyleState.fontFamilyOption.value,
					'--font-size': articleStyleState.fontSizeOption.value,
					'--font-color': articleStyleState.fontColor.value,
					'--container-width': articleStyleState.contentWidth.value,
					'--bg-color': articleStyleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setNewSettings={setArticleStyleState} />
			<Article />
		</div>
	);
};
