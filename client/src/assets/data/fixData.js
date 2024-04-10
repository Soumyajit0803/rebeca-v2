import fs from "fs-extra";

const filePath = './src/assets/data/team.json';

const data = fs.readJSONSync(filePath);

for (const team of data) {
	for (const member of team.members) {
		member.img = "./assets/imgs/team/" + member.name.replace(/\s/g, "").toLowerCase().trim() + ".jpg"; // use after we get team images
		// member.img = "./assets/imgs/team/tbd.webp";
		console.log(member);
	}
}

fs.writeJSONSync(filePath, data);

