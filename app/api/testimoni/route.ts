import { getSheetData } from "@/db/spreadsheet";

export async function GET() {
    try {
      const sheetData = await getSheetData(process.env.SPREADSHEET_ID_TESTIMONI || "", 'Sheet1!A:E');
      const formattedData = formatData(sheetData || [[]])

      return new Response(JSON.stringify(formattedData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
    }
}

export async function POST() {
  try {
    const sheetData = await getSheetData(process.env.SPREADSHEET_ID_TESTIMONI || "", 'Sheet1!A:E');
    const formattedData = formatData(sheetData || [[]])

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
  }
}

function formatData(data: any[][]) {
    const transformedTestimonials = data.slice(1).map(item => {
        return {
            id: item[0],
            nama: item[1],
            img: item[2],
            bintang: parseInt(item[3]),
            review: item[4]
        };
    });

    return transformedTestimonials;
}