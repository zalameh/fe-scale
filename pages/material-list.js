const URL = process.env.NEXT_PUBLIC_NODE_RED_BACK_END_URL;

export default function Page() {
	return (
		<>
			<main>
				<div className='container mx-auto flex flex-col gap-6 pt-14'>
					<div className='flex justify-around gap-4'>
						<div className='w-2/5'>
							<div>SAP Order No.</div>
							<select className='w-full p-2'>
								<option value=''></option>
							</select>
						</div>

						<div className='w-2/5'>
							<div>Product No.</div>
							<select className='w-full p-2'>
								<option value=''></option>
							</select>
						</div>
					</div>

					<table class='table-auto text-center'>
						<thead>
							<tr>
								<th>Material No.</th>
								<th>Quantity</th>
								<th>Actual Quantity</th>
								<th>Duration</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>092318203</td>
								<td>10 Kg</td>
								<td>19 Kg</td>
								<td>00:05:02</td>
								<td>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Link
									</a>
								</td>
							</tr>
							<tr>
								<td>092238203</td>
								<td>14 Kg</td>
								<td>15 Kg</td>
								<td>00:04:03</td>
								<td>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Link
									</a>
								</td>
							</tr>
							<tr>
								<td>012238203</td>
								<td>32 Kg</td>
								<td>31 Kg</td>
								<td>00:08:33</td>
								<td>
									<a
										href='#'
										class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Link
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
