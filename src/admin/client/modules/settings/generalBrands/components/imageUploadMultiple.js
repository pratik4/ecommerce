import React from 'react';
import style from './style.css';
import GalleryItem from './item';
import MultiUploader from './uploader';
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from 'react-sortable-hoc';

const SortableItem = SortableElement(
	({ image, index, onDelete, onImageEdit }) => (
		<li className={style.item}>
			<GalleryItem
				url={image.preview}
				alt={image.name}
				id={image.id}
				onDelete={() => {
					onDelete(image, index);
				}}
				onImageEdit={() => {
					onImageEdit(image);
				}}
			/>
		</li>
	)
);

const SortableList = SortableContainer(({ items, onDelete, onImageEdit }) => (
	<ul className={style.list}>
		{items.map((value, index) => (
			<SortableItem
				key={`item-${index}`}
				index={index}
				image={value}
				onDelete={onDelete}
				onImageEdit={onImageEdit}
			/>
		))}
	</ul>
));

const Gallery = ({
	settings,
	images,
	handleonDrop,
	onImageSort,
	uploading,
	onImageEdit,
	onDelete
}) => {
	if (images && images.length > 0) {
		return (
			<MultiUploader onUpload={handleonDrop} uploading={uploading}>
				{console.log('images inside multi', images)}
				<div className={style.gallery}>
					<SortableList
						axis="x"
						items={images}
						onImageEdit={onImageEdit}
						onDelete={onDelete}
						onSortEnd={({ oldIndex, newIndex }) => {
							let sortedItems = arrayMove(images, oldIndex, newIndex);
							let withNewPosition = sortedItems.map((image, index) => {
								image.position = index;
								return image;
							});
							onImageSort(withNewPosition);
						}}
					/>
				</div>
			</MultiUploader>
		);
	} else {
		{
			console.log('images inside single', images);
		}

		return <MultiUploader onUpload={handleonDrop} uploading={uploading} />;
	}
};

export default Gallery;
