import { seedTEU } from './data/teu.js';
import { seedTFEU } from './data/tfeu.js';
import { seedCharter } from './data/charter.js';
import { seedKeyRegulations } from './data/key-regulations.js';
import { seedKeyDirectives } from './data/key-directives.js';
import { seedCJEUCases } from './data/cjeu-cases.js';
export function seedData(db) {
    console.log('\nSeeding data...');
    // 1. Treaties (foundational — no FK dependencies)
    seedTEU(db); // ~55 TEU articles
    seedTFEU(db); // ~70 TFEU articles
    seedCharter(db); // 54 Charter articles
    // 2. Secondary legislation (references treaties as legal basis)
    seedKeyRegulations(db); // ~30 regulations with key articles
    seedKeyDirectives(db); // ~20 directives with key articles
    // 3. Case law (cites acts from above)
    seedCJEUCases(db); // ~50 landmark CJEU cases
    console.log('\nSeed data complete.');
}
