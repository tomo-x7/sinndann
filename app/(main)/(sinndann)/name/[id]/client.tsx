"use client";

import type * as mytype from "@/app/mytype";
import { useState, useEffect } from "react";
import generate from "./generate";
import Image from "next/image";
import Bluesky from "@/app/static/Bluesky.svg";
import skyshare from "@/app/static/skyshare.svg";
import tokimeki from "@/app/static/tokimeki.png";
import Twitter from "@/app/static/Twitter.svg";
import style from './style.module.css'
const settrendper = 1;
export default function Sinndann({ id, DBdata }: { id: string; DBdata: mytype.DBdata }) {
	const [pages, setpages] = useState(1);
	const [error, seterror] = useState("");
	const [ans, setans] = useState("");
	const [defaultname, setdefaultname] = useState("");
	if (typeof window === "object") {
		const _name = localStorage.getItem("name");
		if (_name && defaultname !== _name) {
			setdefaultname(_name);
		}
	}
	const clickgenerate = () => {
		if (Math.floor(Math.random() * settrendper) === 0) {
			fetch("/api/name/trend", { method: "POST", body: JSON.stringify({ id: id }) });
		}
		let name = (document.getElementById("name") as HTMLInputElement).value;
		if (name === "") {
			name = "名無しの権兵衛";
		} else {
			localStorage?.setItem("name", name);
		}
		setdefaultname(name);
		setans(
			generate(name, DBdata.type, {
				id: Number.parseInt(id),
				template: DBdata.template,
				list: DBdata.random,
			}),
		);
		setpages(2);
	};
	return (
		<>
			{(() => {
				switch (pages) {
					case 1:
						return (
							<div className="flex flex-col h-full justify-center items-center px-8 gap-4">
								<input
									type="text"
									id="name"
									placeholder="名前を入力"
									defaultValue={defaultname}
									className="h-12 text-2xl py-6 px-3 w-full"
									onKeyDown={(e) => {
										if (e.key === "Enter") clickgenerate();
									}}
								/>
								<button
									type="button"
									onClick={clickgenerate}
									className="bg-green text-white h-10 rounded-full text-3xl px-16 shadow-lg hover:shadow-none"
								>
									診断
								</button>
							</div>
						);
					case 2: {
						const encodesharestring = encodeURIComponent(
							`${ans}\n#diagnosky #${DBdata.title}\nhttps://diagnosky.vercel.app/name/${id}`,
						);
						const encodesharetext = encodeURIComponent(`${ans}#diagnosky #${DBdata.title}`);
						const encodeshareurl = encodeURIComponent(`https://diagnosky.vercel.app/name/${id}`);
						const copystring = `${ans}\n#diagnosky #${DBdata.title}\nhttps://diagnosky.vercel.app/name/${id}`;
						const shareiconsize=32
						return (
							<div className="flex flex-col justify-around h-full">
								<div>{ans}</div>
								<div>
									<div>結果をシェアする</div>
									<div className={style.share}>
										<a
											href={`https://bsky.app/intent/compose?text=${encodesharestring}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src={Bluesky.src}
												width={shareiconsize-4}
												height={shareiconsize-4}
												alt="Bluesky"
											/>
										</a>
										<a
											href={`https://tokimeki.blue/shared?text=${encodesharestring}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src={tokimeki.src}
												width={shareiconsize}
												height={shareiconsize}
												alt="TOKIMEKI"
											/>
										</a>
										<a
											href={`https://skyshare.uk/app/?sharedText=${encodesharetext}&sharedUrl=${encodeshareurl}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src={skyshare.src}
												width={shareiconsize}
												height={shareiconsize}
												alt="Skyshare"
											/>
										</a>
										<a
											href={`https://twitter.com/intent/tweet?text=${encodesharestring}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src={Twitter.src}
												width={shareiconsize-8}
												height={shareiconsize-8}
												alt="Twitter"
											/>
										</a>
										<button
											type="button"
											onClick={() => {
												navigator.clipboard.writeText(copystring);
											}}
										>
											コピーする
										</button>
									</div>
								</div>
								<button
									className="w-fit bg-green text-white"
									type="button"
									onClick={() => {
										setpages(1);
									}}
								>
									＜{"  "}戻る
								</button>
							</div>
						);
					}
					case -1:
						return <div>{error}</div>;
					default:
						break;
				}
			})()}
		</>
	);
}
