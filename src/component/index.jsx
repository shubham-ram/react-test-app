import styles from "./styles.module.css";

const arr = [...new Array(50).keys()];

function Main() {
	return (
		<div>
			{arr.map((_, index) => (
				<div key={index} className={styles.in_view}>
					Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Modi dignissimos ducimus fugiat sapiente, velit
					quia id hic similique optio quam illum nisi iure quae
					ipsa nemo praesentium aut suscipit? Repudiandae
					facilis, totam placeat aut laboriosam praesentium a,
					sed rerum ullam soluta magnam in inventore, asperiores
					vel. Eveniet officiis qui ratione fugiat commodi
					blanditiis, a ad explicabo error eligendi nobis tenetur
					culpa eius vitae. Autem nulla quos magni neque, nisi
					expedita sed pariatur deleniti dolor similique
					praesentium ipsum eos asperiores placeat voluptas ipsa,
					ullam explicabo quas aspernatur inventore non hic
					incidunt quae ipsam. Accusamus doloribus itaque ipsa
					sint maxime quia! Dolores possimus eos accusantium
					maiores praesentium aspernatur a consectetur molestiae,
					quaerat non facilis, autem debitis, saepe ipsam odio
					perspiciatis voluptas. Maxime qui unde amet delectus
					asperiores quidem beatae dolores corporis consectetur
					earum laboriosam voluptatem eaque explicabo ipsum velit
					expedita officiis tempore, alias repellat eum, labore
					nemo. Harum facere quaerat molestiae eius, ullam
					ratione laudantium adipisci earum nulla qui eligendi,
					ipsam similique modi laborum eveniet rerum ut. Quisquam
					fugit inventore possimus fugiat commodi error nam,
					voluptate odio temporibus quos vero debitis magni fuga,
					perferendis deleniti! Deserunt, officia nobis vero
					possimus corrupti harum unde a obcaecati quidem
					assumenda quis ipsam iure voluptates! Nisi ipsum
					debitis officiis magnam. Tenetur ad mollitia nesciunt
					odit quas ea quia vel itaque praesentium aut! Vero sunt
					atque at obcaecati unde veritatis rerum velit quaerat
					optio placeat! Explicabo exercitationem doloribus fugit
					obcaecati accusamus. Accusantium voluptatum voluptates
					libero ipsum quo nihil error, repellendus, aliquid
					animi pariatur, maiores recusandae voluptatibus. Fugiat
					sint impedit ipsa, et obcaecati laboriosam animi
					deserunt veritatis, perferendis cum eum pariatur, atque
					quam magni unde! In, impedit quidem accusamus omnis
					ullam rerum repellendus vero! Qui aliquid asperiores
					recusandae vitae necessitatibus ducimus, libero tempore
					repellendus voluptates id illo in sequi fugit cum
					eligendi quam illum architecto nobis. Qui ipsum
					incidunt facilis, culpa corrupti, delectus, aperiam
					earum debitis commodi cumque tenetur ab. Facere dolores
					quos et, aspernatur, blanditiis molestiae quisquam quis
					dicta sapiente fugit maxime dolore laboriosam quo
					expedita sequi corrupti ipsum commodi dolorum iure,
					accusantium delectus. Quia excepturi consequatur
					molestias deleniti dolorum voluptas veritatis quas
					possimus officia, id ab asperiores autem ducimus
					adipisci aperiam iusto expedita magnam corrupti minus
					est natus. Itaque, temporibus!
				</div>
			))}

			<div className={styles.not_in_view}>
				<ul>
					{Array.from({ length: 500 }).map((_, i) => (
						<li key={i}>Item {i}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Main;
